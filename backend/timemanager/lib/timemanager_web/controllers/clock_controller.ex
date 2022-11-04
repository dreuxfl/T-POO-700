defmodule TimemanagerWeb.ClockController do
  use TimemanagerWeb, :controller

  alias Timemanager.Chrono
  alias Timemanager.Chrono.Clock
  alias Timemanager.IsAdmin

  action_fallback TimemanagerWeb.FallbackController

  user_clocks = []

  def create(conn, %{"userID" => userID, "clock" => clock_params}) do
    {parsedUserID, ""} = Integer.parse(userID)
    if Timemanager.IsAdmin.is_admin(conn) !== true and Guardian.Plug.current_resource(conn).id !== parsedUserID do
      render(conn, "error.json", %{error: "You are not allowed to do this action!"})
    else
      new_clock = Map.put(clock_params, "user", userID)
      with {:ok, %Clock{} = clock} <- Chrono.create_clock(new_clock) do
        conn
        |> put_status(:created)
        |> put_resp_header("location", Routes.clock_path(conn, :create, clock))
        |> render("show.json", clock: clock)
      end
    end
  end

  def index(conn, %{"userID" => userID}) do
    {parsedUserID, ""} = Integer.parse(userID)
    if Timemanager.IsAdmin.is_admin(conn) !== true and Guardian.Plug.current_resource(conn).id !== parsedUserID do
      render(conn, "error.json", %{error: "You are not allowed to do this action!"})
    else
      url_params = Plug.Conn.fetch_query_params(conn)
      if(is_nil(url_params.query_params["date"])) do
        clocks = Chrono.list_clocks()
        {parsedUserID, ""} = Integer.parse(userID)
        user_clocks = Enum.filter(clocks, fn(clock) -> clock.user != nil && clock.user == parsedUserID end)
        render(conn, "index.json", clocks: user_clocks)
      else
        clocks = Chrono.list_clocks_by_date(url_params.query_params["date"])
        {parsedUserID, ""} = Integer.parse(userID)
        user_clocks = Enum.filter(clocks, fn(clock) -> clock.user != nil && clock.user == parsedUserID end)
        render(conn, "index.json", clocks: user_clocks)
      end
    end
  end

  def fetchCurrentClocks(conn, %{"userID" => userID}) do
    {parsedUserID, ""} = Integer.parse(userID)
    if Timemanager.IsAdmin.is_admin(conn) !== true and Guardian.Plug.current_resource(conn).id !== parsedUserID do
      render(conn, "error.json", %{error: "You are not allowed to do this action!"})
    else
      clocks = Chrono.list_current_clocks
      {parsedUserID, ""} = Integer.parse(userID)
      user_clocks = Enum.filter(clocks, fn(clock) -> clock.user != nil && clock.user == parsedUserID end)
      render(conn, "index.json", clocks: user_clocks)
    end
  end
end
