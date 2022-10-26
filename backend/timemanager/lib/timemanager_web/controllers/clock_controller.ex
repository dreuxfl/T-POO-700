defmodule TimemanagerWeb.ClockController do
  use TimemanagerWeb, :controller

  alias Timemanager.Chrono
  alias Timemanager.Chrono.Clock

  action_fallback TimemanagerWeb.FallbackController

  user_clocks = []

  def index(conn, %{"userID" => id}) do
    clocks = Chrono.list_clocks()
    {id, ""} = Integer.parse(id)
    user_clocks = Enum.filter(clocks, fn(clock) -> clock.user != nil && clock.user == id end)
    render(conn, "index.json", clocks: user_clocks)
  end

  def create(conn, %{"userID" => id, "clock" => clock_params}) do
    new_clock = Map.put(clock_params, "user", id)

    with {:ok, %Clock{} = clock} <- Chrono.create_clock(new_clock) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.clock_path(conn, :create, clock))
      |> render("show.json", clock: clock)
    end
  end
end
