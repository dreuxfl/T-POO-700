defmodule Timemanager.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :username, :string
      add :email, :string
      add :password, :string
      add :is_admin, :boolean, default: false
      timestamps()
    end

    create unique_index(:users, [:username])
  end
end
