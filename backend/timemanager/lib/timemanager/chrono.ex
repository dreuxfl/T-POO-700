defmodule Timemanager.Chrono do
  @moduledoc """
  The Chrono context.
  """

  import Ecto.Query, warn: false
  alias Timemanager.Repo

  alias Timemanager.Chrono.Clock
  @doc """
  Returns the list of clocks.

  ## Examples

      iex> list_clocks()
      [%Clock{}, ...]

  """
  def list_clocks do
    Repo.all(Clock)
  end

  def list_clocks_by_date(date) do
    query = from c in Clock,
      where: c.time > (^date),
      order_by: c.time
    Repo.all(query)
  end

  def list_clocks_by_dateuid(date, uid, status) do
    datenaivetoday =  DateTime.to_naive(%DateTime{
      year: date.year, month: date.month, day: date.day, zone_abbr: "CET",
      hour: 0, minute: 0, second: 0, microsecond: {0, 0},
      utc_offset: 3600, std_offset: 0, time_zone: "Europe/Warsaw"
    })

    tomorrow  = Date.add(datenaivetoday, 1)

    datenaivetomorrow =  DateTime.to_naive(%DateTime{
      year: tomorrow.year, month: tomorrow.month, day: tomorrow.day, zone_abbr: "CET",
      hour: 0, minute: 0, second: 0, microsecond: {0, 0},
      utc_offset: 3600, std_offset: 0, time_zone: "Europe/Warsaw"
    })
    query = from c in Clock,
                 where: c.time >= ^datenaivetoday and c.time <= ^datenaivetomorrow and c.user == ^uid and c.status == ^status,
                 order_by: c.time
    Repo.all(query)
  end

  def list_current_clocks do
    today = Date.utc_today()
    todayNaive =  DateTime.to_naive(%DateTime{
      year: today.year, month: today.month, day: today.day, zone_abbr: "CET",
      hour: 0, minute: 0, second: 0, microsecond: {0, 0},
      utc_offset: 3600, std_offset: 0, time_zone: "Europe/Warsaw"
    })
    # todayNaiveString = NaiveDatetime.to_string(todayNaive)

    query = from c in Clock,
      where: c.time > (^todayNaive)
    Repo.all(query)
  end


  def list_clocks_distinctUID() do
    query = from c in Clock,
      distinct: c.user
    Repo.all(query)
  end

  @doc """
  Gets a single clock.

  Raises `Ecto.NoResultsError` if the Clock does not exist.

  ## Examples

      iex> get_clock!(123)
      %Clock{}

      iex> get_clock!(456)
      ** (Ecto.NoResultsError)

  """
  def get_clock!(id), do: Repo.get!(Clock, id)

  @doc """
  Creates a clock.

  ## Examples

      iex> create_clock(%{field: value})
      {:ok, %Clock{}}

      iex> create_clock(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_clock(attrs \\ %{}) do
    %Clock{}
    |> Clock.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a clock.

  ## Examples

      iex> update_clock(clock, %{field: new_value})
      {:ok, %Clock{}}

      iex> update_clock(clock, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_clock(%Clock{} = clock, attrs) do
    clock
    |> Clock.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a clock.

  ## Examples

      iex> delete_clock(clock)
      {:ok, %Clock{}}

      iex> delete_clock(clock)
      {:error, %Ecto.Changeset{}}

  """
  def delete_clock(%Clock{} = clock) do
    Repo.delete(clock)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking clock changes.

  ## Examples

      iex> change_clock(clock)
      %Ecto.Changeset{data: %Clock{}}

  """
  def change_clock(%Clock{} = clock, attrs \\ %{}) do
    Clock.changeset(clock, attrs)
  end
end
