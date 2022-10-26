defmodule TimemanagerWeb.UserController do
  use TimemanagerWeb, :controller

  alias Timemanager.Employees
  alias Timemanager.Employees.User

  action_fallback TimemanagerWeb.FallbackController

  def index(conn, _params) do
    users = Employees.list_users()
    render(conn, "index.json", users: users)
  end

  def create(conn, %{"user" => user_params}) do
    with {:ok, %User{} = user} <- Employees.create_user(user_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.user_path(conn, :show, user))
      |> render("show.json", user: user)
    end
  end

  def show(conn, %{"userID" => userID}) do
    user = Employees.get_user!(userID)
    render(conn, "show.json", user: user)
  end

  def update(conn, %{"userID" => userID, "user" => user_params}) do
    user = Employees.get_user!(userID)

    with {:ok, %User{} = user} <- Employees.update_user(user, user_params) do
      render(conn, "show.json", user: user)
    end
  end

  def delete(conn, %{"userID" => userID}) do
    user = Employees.get_user!(userID)

    with {:ok, %User{}} <- Employees.delete_user(user) do
      send_resp(conn, :no_content, "")
    end
  end
end
