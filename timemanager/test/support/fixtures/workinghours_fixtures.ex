defmodule Timemanager.WorkinghoursFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Timemanager.Workinghours` context.
  """

  @doc """
  Generate a workingtime.
  """
  def workingtime_fixture(attrs \\ %{}) do
    {:ok, workingtime} =
      attrs
      |> Enum.into(%{
        end: ~N[2022-10-24 08:31:00],
        start: ~N[2022-10-24 08:31:00]
      })
      |> Timemanager.Workinghours.create_workingtime()

    workingtime
  end
end
