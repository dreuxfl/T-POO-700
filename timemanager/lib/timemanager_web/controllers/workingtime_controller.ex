defmodule TimemanagerWeb.WorkingtimeController do
  use TimemanagerWeb, :controller

  alias Timemanager.Workinghours
  alias Timemanager.Workinghours.Workingtime

  action_fallback TimemanagerWeb.FallbackController

  def index(conn, _params) do
    workingtimes = Workinghours.list_workingtimes()
#    Enum.each(workingtimes, fn time ->
#      if time.user == params["id"] do
#
#        if params["start"] do
#          if params["end"] do
#            render("show.json", workingtime: time)
#            elseif(time.startTime > params["start"]) do render("show.json", workingtime: time) end
#          end
#
#        else
#          if params["end"]
#          if time.endTime <= params["end"] do render("show.json", workingtime: time) end
#
#        else
#          render("show.json", workingtime: time)
#
#        end
#
#      end
#    end)
    render(conn, "index.json", workingtimes: workingtimes)
  end

  def create(conn, %{"userID" => id, "workingtime" => workingtime_params}) do
    new_working_time = Map.put(workingtime_params, "user", id)

    with {:ok, %Workingtime{} = workingtime} <- Workinghours.create_workingtime(new_working_time) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.workingtime_path(conn, :create, workingtime))
      |> render("show.json", workingtime: workingtime)
    end
  end

  def show(conn, %{"id" => id}) do
    workingtime = Workinghours.get_workingtime!(id)
    render(conn, "show.json", workingtime: workingtime)
  end

  def update(conn, %{"id" => id, "workingtime" => workingtime_params}) do
    workingtime = Workinghours.get_workingtime!(id)

    with {:ok, %Workingtime{} = workingtime} <- Workinghours.update_workingtime(workingtime, workingtime_params) do
      render(conn, "show.json", workingtime: workingtime)
    end
  end

  def delete(conn, %{"id" => id}) do
    workingtime = Workinghours.get_workingtime!(id)

    with {:ok, %Workingtime{}} <- Workinghours.delete_workingtime(workingtime) do
      send_resp(conn, :no_content, "")
    end
  end
end
