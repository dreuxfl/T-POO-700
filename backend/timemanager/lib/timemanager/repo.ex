defmodule Timemanager.Repo do
  use Ecto.Repo,
    otp_app: :timemanager,
    adapter: Ecto.Adapters.Postgres
    def init(_, config) do
      config = config
        |> Keyword.put(:username, System.get_env("PGUSER") || "postgres")
        |> Keyword.put(:password, System.get_env("PGPASSWORD") || "password")
        |> Keyword.put(:database, System.get_env("PGDATABASE") || "time_manager_dev")
        |> Keyword.put(:hostname, System.get_env("PGHOST") || "localhost")
        |> Keyword.put(:port, System.get_env("PGPORT") || 5432)
      {:ok, config}
    end
end
