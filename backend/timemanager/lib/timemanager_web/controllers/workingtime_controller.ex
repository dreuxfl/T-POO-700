defmodule TimemanagerWeb.WorkingtimeController do
  use TimemanagerWeb, :controller

  alias Timemanager.Workinghours
  alias Timemanager.Workinghours.Workingtime

  alias Timemanager.Employees

  action_fallback TimemanagerWeb.FallbackController

  def index(conn, _params) do
    workingtimes = Workinghours.list_workingtimes()
    render(conn, "index.json", workingtimes: workingtimes)
  end

  def create(conn, %{"userID" => userID, "workingtime" => workingtime_params}) do
    new_working_time = Map.put(workingtime_params, "user", userID)

    with {:ok, %Workingtime{} = workingtime} <- Workinghours.create_workingtime(new_working_time) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.workingtime_path(conn, :create, workingtime))
      |> render("show.json", workingtime: workingtime)
    end
  end

  def show(conn, %{"userID" => userID, "id" => wtID}) do
    workingtime = Workinghours.get_workingtime!(wtID)
    {parsedUserID, ""} = Integer.parse(userID)
    if workingtime.user == parsedUserID do
      render(conn, "show.json", workingtime: workingtime)
    else
      conn
      |> put_status(:not_found)
      |> render(TimemanagerWeb.ErrorView, "404.json")
    end
  end

  def update(conn, %{"id" => wtID, "workingtime" => workingtime_params}) do
    workingtime = Workinghours.get_workingtime!(wtID)

    with {:ok, %Workingtime{} = workingtime} <- Workinghours.update_workingtime(workingtime, workingtime_params) do
      render(conn, "show.json", workingtime: workingtime)
    end
  end

  def delete(conn, %{"id" => wtID}) do
    workingtime = Workinghours.get_workingtime!(wtID)

    with {:ok, %Workingtime{}} <- Workinghours.delete_workingtime(workingtime) do
      send_resp(conn, :no_content, "")
    end
  end
end
