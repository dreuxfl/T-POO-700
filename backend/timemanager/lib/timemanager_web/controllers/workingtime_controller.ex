defmodule TimemanagerWeb.WorkingtimeController do
  use TimemanagerWeb, :controller

  alias Timemanager.Workinghours
  alias Timemanager.Workinghours.Workingtime
  alias Timemanager.IsAdmin

  action_fallback TimemanagerWeb.FallbackController

  def index_with_params(conn, %{"userID" => userID}) do
    if Timemanager.IsAdmin.is_admin(conn) !== true do
      render(conn, "error.json", %{error: "You are not allowed to do this action!"})
    else
      {parsedUserID, ""} = Integer.parse(userID)
      workingtimes = Workinghours.list_workingtimes()
      url_params = Plug.Conn.fetch_query_params(conn)
      started = NaiveDateTime.from_iso8601!(url_params.query_params["start"])
      ended = NaiveDateTime.from_iso8601!(url_params.query_params["end"])
      user_workingtimes = Enum.filter(workingtimes, fn(workingtime)
      -> workingtime.user != nil &&
           workingtime.user == parsedUserID &&
           NaiveDateTime.compare(workingtime.start,started) != :lt &&
           NaiveDateTime.compare(workingtime.end,ended) != :gt
      end)
      render(conn, "index.json", workingtimes: user_workingtimes)
    end
  end

  def create(conn, %{"userID" => userID, "workingtime" => workingtime_params}) do
    if Timemanager.IsAdmin.is_admin(conn) !== true do
      render(conn, "error.json", %{error: "You are not allowed to do this action!"})
    else
      new_working_time = Map.put(workingtime_params, "user", userID)
      with {:ok, %Workingtime{} = workingtime} <- Workinghours.create_workingtime(new_working_time) do
        conn
        |> put_status(:created)
        |> put_resp_header("location", Routes.workingtime_path(conn, :create, workingtime))
        |> render("show.json", workingtime: workingtime)
      end
    end
  end

  def index(conn, _params) do
    if Timemanager.IsAdmin.is_admin(conn) !== true do
      render(conn, "error.json", %{error: "You are not allowed to do this action!"})
    else
      workingtimes = Workinghours.list_workingtimes()
      render(conn, "index.json", workingtimes: workingtimes)
    end
  end

  def all(conn, %{"userID" => userID}) do
    {parsedUserID, ""} = Integer.parse(userID)
    if Timemanager.IsAdmin.is_admin(conn) !== true and Guardian.Plug.current_resource(conn).id !== parsedUserID do
      render(conn, "error.json", %{error: "You are not allowed to do this action!"})
    else
      workingtimes = Workinghours.list_workingtimes()
      {parsedUserID, ""} = Integer.parse(userID)
      user_working_times = Enum.filter(workingtimes, fn(wt) -> wt.user != nil && wt.user == parsedUserID end)
      render(conn, "index.json", workingtimes: user_working_times)
    end
  end

  def show(conn, %{"userID" => userID, "id" => wtID}) do
    {parsedUserID, ""} = Integer.parse(userID)
    if Timemanager.IsAdmin.is_admin(conn) !== true and Guardian.Plug.current_resource(conn).id !== parsedUserID do
      render(conn, "error.json", %{error: "You are not allowed to do this action!"})
    else
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
  end

  def update(conn, %{"id" => wtID, "workingtime" => workingtime_params}) do
    if Timemanager.IsAdmin.is_admin(conn) !== true do
      render(conn, "error.json", %{error: "You are not allowed to do this action!"})
    else
      workingtime = Workinghours.get_workingtime!(wtID)
      with {:ok, %Workingtime{} = workingtime} <- Workinghours.update_workingtime(workingtime, workingtime_params) do
        render(conn, "show.json", workingtime: workingtime)
      end
    end
  end

  def delete(conn, %{"id" => wtID}) do
    if Timemanager.IsAdmin.is_admin(conn) !== true do
      render(conn, "error.json", %{error: "You are not allowed to do this action!"})
    else
      workingtime = Workinghours.get_workingtime!(wtID)
      with {:ok, %Workingtime{}} <- Workinghours.delete_workingtime(workingtime) do
        send_resp(conn, :no_content, "")
      end
    end
  end
end
