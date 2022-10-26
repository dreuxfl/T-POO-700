defmodule Timemanager.Chrono.Clock do
  use Ecto.Schema
  import Ecto.Changeset

  schema "clocks" do
    field :status, :boolean, default: true
    field :time, :naive_datetime_usec, default: NaiveDateTime.utc_now()
    field :user, :id

    timestamps()
  end

  @doc false
  def changeset(clock, attrs) do
    clock
    |> cast(attrs, [:time, :status, :user])
    |> validate_required([:time, :status, :user])
    |> validate_format(:time,~r/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)
  end
end
