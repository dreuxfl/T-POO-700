defmodule Timemanager.ChronoFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Timemanager.Chrono` context.
  """

  @doc """
  Generate a clock.
  """
  def clock_fixture(attrs \\ %{}) do
    {:ok, clock} =
      attrs
      |> Enum.into(%{
        status: true,
        time: ~N[2022-10-24 08:27:00]
      })
      |> Timemanager.Chrono.create_clock()

    clock
  end
end
