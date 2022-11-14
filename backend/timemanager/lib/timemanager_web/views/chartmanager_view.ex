defmodule TimemanagerWeb.ChartmanagerView do
  use TimemanagerWeb, :view
  alias TimemanagerWeb.ChartmanagerView

  def render("chart_workingtime_uid.json", %{chartmanager: chart}) do
    %{data: render_many(chart, ChartmanagerView, "chart.json")}
  end

  def render("piechart.json", %{chartmanager: chart}) do
    %{data: render_one(chart, ChartmanagerView, "chart.json")}
  end

  def render("barchart.json", %{chartmanager: chart}) do
    %{data: render_many(chart, ChartmanagerView, "statchart.json")}
  end

  def render("statchart.json", %{chartmanager: chart})do
    %{
      day: chart.day,
      usersthatclockedin: chart.usersthatclockedin,
      userworkingtime: chart.userworkingtime
    }
  end

  def render("chart.json", %{chartmanager: chart}) do
    %{
      day: chart.day,
      id: chart.id,
      hoursclocked: chart.hoursclocked,
      workingtime: chart.workingtime
    }
  end
end
