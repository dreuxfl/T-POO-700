defmodule TimemanagerWeb.ChartmanagerController do
  use TimemanagerWeb, :controller

  alias Timemanager.Chrono
  alias Timemanager.Chrono.Clock
  alias Timemanager.Employees
  alias Timemanager.Employees.User
  alias Timemanager.IsAdmin
  alias Timemanager.Workinghours
  alias Timemanager.Workinghours.Workingtime

  action_fallback TimemanagerWeb.FallbackController

  def linechart_workingtime_clockedhours(conn, %{"userID" => userID}) do
    {parsed_user_id, ""} = Integer.parse(userID)
    url_params = Plug.Conn.fetch_query_params(conn)
    started = NaiveDateTime.from_iso8601!(url_params.query_params["start"])
    ended = NaiveDateTime.from_iso8601!(url_params.query_params["end"])
    user_workingtimes = Workinghours.list_workingtimes_by_dates_lineschart(started, ended, parsed_user_id)
    if user_workingtimes == nil do
      conn
      |> put_status(:not_found)
      |> render("error.json", %{error: "No workingtimes found"})
    else
      chart_data = Enum.map(user_workingtimes, fn  user_workingtime ->

        user_clocks_true = Chrono.list_clocks_by_dateuid(user_workingtime.start, parsed_user_id, true)
        user_clocks_false = Chrono.list_clocks_by_dateuid(user_workingtime.start, parsed_user_id, false)
          dummy_clock_true = Enum.reduce(user_clocks_true, 0,  fn  user_clock, acc ->
            acc + user_clock.time.hour
          end)

        dummy_clock_false = Enum.reduce(user_clocks_false, 0,  fn  user_clock, acc ->
          acc + user_clock.time.hour
        end)
<<<<<<< Updated upstream

        if Enum.count(user_clocks_true) > Enum.count(user_clocks_false) do
          dummy_clock_false = dummy_clock_false + NaiveDateTime.utc_now().hour
        end
=======
>>>>>>> Stashed changes
        dummy_clock = dummy_clock_false - dummy_clock_true
        %{
          id: user_workingtime.user,
          day: NaiveDateTime.to_date(user_workingtime.start),
          workingtime: NaiveDateTime.diff(user_workingtime.end, user_workingtime.start, :hour),
          hoursclocked: dummy_clock
        }
      end)
      conn
      |> put_status(:ok)
      |> render("chart_workingtime_uid.json", chartmanager: chart_data)
    end
  end

  def piechart_workingtime_clockedhours_user(conn, %{"userID" => userID}) do
    {parsed_user_id, ""} = Integer.parse(userID)
    url_params = Plug.Conn.fetch_query_params(conn)
    param_date = NaiveDateTime.from_iso8601!(url_params.query_params["date"])
    workingtimes = Workinghours.list_workingtimes_by_date_piechart(param_date, parsed_user_id)
    if workingtimes === nil do
      conn
      |> put_status(:not_found)
      |> render("error.json", error: "No workingtimes found")
    else
      user_workingtime = Enum.find(workingtimes, fn(workingtime) -> workingtime.user != nil && workingtime.user == parsed_user_id end)

      user_clocks_true = Chrono.list_clocks_by_dateuid(param_date, parsed_user_id, true)
      user_clocks_false = Chrono.list_clocks_by_dateuid(param_date, parsed_user_id, false)

      dummy_clock_true = Enum.reduce(user_clocks_true, 0,  fn  user_clock, acc ->
        acc + user_clock.time.hour
      end)

      dummy_clock_false = Enum.reduce(user_clocks_false, 0,  fn  user_clock, acc ->
        acc + user_clock.time.hour
      end)
<<<<<<< Updated upstream
      if Enum.count(user_clocks_true) > Enum.count(user_clocks_false) do
        dummy_clock_false = dummy_clock_false + NaiveDateTime.utc_now().hour
=======
      dummy_clock_false = if Enum.count(user_clocks_true) > Enum.count(user_clocks_false) do
        dummy_clock_false + NaiveDateTime.utc_now().hour
>>>>>>> Stashed changes
      end
      IO.puts(dummy_clock_false)
      dummy_clock = dummy_clock_false - dummy_clock_true
      chart_result = %{
        id: user_workingtime.user,
        day: NaiveDateTime.to_date(user_workingtime.start),
        workingtime: NaiveDateTime.diff(user_workingtime.end, user_workingtime.start, :hour),
        hoursclocked: dummy_clock
      }
      conn
      |> put_status(:ok)
      |> render("piechart.json", chartmanager: chart_result)
    end
  end

  def barchart_stats(conn, _params) do
    if Timemanager.IsAdmin.is_admin(conn) !== true do
      conn
      |> put_status(:forbidden)
      |> render("error.json", %{error: "You are not authorized to access this chart"})
    else
      user_clocks = Chrono.list_clocks_distinct_uid
      user_workingtimes = Workinghours.list_workingtimes_distinct_uid

      chart_result = Enum.map(user_clocks, fn  user_clock ->
        user_clocked_in = Enum.count(user_clocks)
        user_should_be_working = Enum.count(user_workingtimes)
        %{
          day: NaiveDateTime.to_date(user_clock.time),
          usersthatclockedin: user_clocked_in,
          userworkingtime: user_should_be_working
        }
      end)
      chart_result = Enum.uniq_by(chart_result, fn chart -> chart.day end)
      render(conn, "barchart.json", chartmanager: chart_result)
    end
  end
end
