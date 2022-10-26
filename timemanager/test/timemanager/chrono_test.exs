defmodule Timemanager.ChronoTest do
  use Timemanager.DataCase

  alias Timemanager.Chrono

  describe "clocks" do
    alias Timemanager.Chrono.Clock

    import Timemanager.ChronoFixtures

    @invalid_attrs %{status: nil, time: nil}

    test "list_clocks/0 returns all clocks" do
      clock = clock_fixture()
      assert Chrono.list_clocks() == [clock]
    end

    test "get_clock!/1 returns the clock with given id" do
      clock = clock_fixture()
      assert Chrono.get_clock!(clock.id) == clock
    end

    test "create_clock/1 with valid data creates a clock" do
      valid_attrs = %{status: true, time: ~N[2022-10-24 08:27:00]}

      assert {:ok, %Clock{} = clock} = Chrono.create_clock(valid_attrs)
      assert clock.status == true
      assert clock.time == ~N[2022-10-24 08:27:00]
    end

    test "create_clock/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Chrono.create_clock(@invalid_attrs)
    end

    test "update_clock/2 with valid data updates the clock" do
      clock = clock_fixture()
      update_attrs = %{status: false, time: ~N[2022-10-25 08:27:00]}

      assert {:ok, %Clock{} = clock} = Chrono.update_clock(clock, update_attrs)
      assert clock.status == false
      assert clock.time == ~N[2022-10-25 08:27:00]
    end

    test "update_clock/2 with invalid data returns error changeset" do
      clock = clock_fixture()
      assert {:error, %Ecto.Changeset{}} = Chrono.update_clock(clock, @invalid_attrs)
      assert clock == Chrono.get_clock!(clock.id)
    end

    test "delete_clock/1 deletes the clock" do
      clock = clock_fixture()
      assert {:ok, %Clock{}} = Chrono.delete_clock(clock)
      assert_raise Ecto.NoResultsError, fn -> Chrono.get_clock!(clock.id) end
    end

    test "change_clock/1 returns a clock changeset" do
      clock = clock_fixture()
      assert %Ecto.Changeset{} = Chrono.change_clock(clock)
    end
  end
end
