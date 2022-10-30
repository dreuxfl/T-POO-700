defmodule TimemanagerWeb.ChartmanagerController do
  use TimemanagerWeb, :controller
  alias Timemanager.Workinghours
  alias Timemanager.Workinghours.Workingtime
  alias Timemanager.Employees
  alias Timemanager.Employees.User
  alias Timemanager.Chrono
  alias Timemanager.Chrono.Clock

  action_fallback TimemanagerWeb.FallbackController

  def linechart_workingtime_clockedhours(conn, %{"userID" => userID}) do
    {parsedUserID, ""} = Integer.parse(userID)
    workingtimes = Workinghours.list_workingtimes()
    url_params = Plug.Conn.fetch_query_params(conn)
    started = NaiveDateTime.from_iso8601!(url_params.query_params["start"])
    ended = NaiveDateTime.from_iso8601!(url_params.query_params["end"])
    user_workingtimes = Enum.filter(workingtimes, fn(workingtime) -> workingtime.user != nil &&
                                                                       workingtime.user == parsedUserID &&
                                                                       NaiveDateTime.compare(workingtime.start,started) != :lt &&
                                                                       NaiveDateTime.compare(workingtime.end,ended) != :gt
    end)
    chartdata = Enum.map(user_workingtimes, fn  user_workingtime ->
        clocks = Chrono.list_clocks()
        user_clocks = Enum.filter(clocks, fn(clock) -> clock.user != nil && clock.user == parsedUserID &&
                                                        Date.compare(NaiveDateTime.to_date(clock.time) ,NaiveDateTime.to_date(user_workingtime.start)) == :eq end)
        dummy_clock = Enum.reduce(user_clocks, 0,  fn  user_clock, acc ->
          if user_clock.status do
            acc - user_clock.time.hour
            else
            acc + user_clock.time.hour
          end
        end)
        %{
          id: user_workingtime.user,
          day: NaiveDateTime.to_date(user_workingtime.start),
          workingtime: NaiveDateTime.diff(user_workingtime.end, user_workingtime.start, :hour),
          hoursclocked: dummy_clock
        }
    end)
    conn
    |> put_status(:ok)
    |> render("chart_workingtime_uid.json", chartmanager: chartdata)
  end


  def piechart_workingtime_clockedhours_user(conn, %{"userID" => userID}) do
    {parsedUserID, ""} = Integer.parse(userID)
    workingtimes = Workinghours.list_workingtimes()
    url_params = Plug.Conn.fetch_query_params(conn)
    param_date = NaiveDateTime.from_iso8601!(url_params.query_params["date"])
    user_workingtime = Enum.find(workingtimes, fn(workingtime) -> workingtime.user != nil &&
                                                                       workingtime.user == parsedUserID &&
                                                                    Date.compare(NaiveDateTime.to_date(workingtime.start),NaiveDateTime.to_date(param_date)) == :eq end)
    clocks = Chrono.list_clocks()
    user_clocks = Enum.filter(clocks, fn(clock) -> clock.user != nil && clock.user == parsedUserID &&
                                                       Date.compare(NaiveDateTime.to_date(clock.time) ,
                                                         NaiveDateTime.to_date(param_date)) == :eq end)
      dummy_clock = Enum.reduce(user_clocks, 0,  fn  user_clock, acc ->
        if user_clock.status do
          acc - user_clock.time.hour
        else
          acc + user_clock.time.hour
        end
      end)

    chart_result= %{
      id: user_workingtime.user,
      day: NaiveDateTime.to_date(user_workingtime.start),
      workingtime: NaiveDateTime.diff(user_workingtime.end, user_workingtime.start, :hour),
      hoursclocked: dummy_clock
    }
    conn
    |> put_status(:ok)
    |> render("piechart.json", chartmanager: chart_result)
  end

  def barchart_stats(conn, _params) do
    clocks = Chrono.list_clocks()
    user_clocks = Enum.uniq_by(clocks, fn clock -> clock.user
    end)
    workingtimes = Workinghours.list_workingtimes()
    user_workingtimes = Enum.uniq_by(workingtimes, fn workingtime -> workingtime.user
    end)


    chart_result= Enum.map(user_clocks, fn  user_clock->
    user_clockedIn = Enum.count(user_clocks)
    user_should_be_working = Enum.count(user_workingtimes)
      %{
      day: NaiveDateTime.to_date(user_clock.time),
      usersthatclockedin: user_clockedIn,
      userworkingtime: user_should_be_working
    }
    end)
    chart_result = Enum.uniq_by(chart_result, fn chart -> chart.day end)
    render(conn, "barchart.json", chartmanager: chart_result)
  end



end