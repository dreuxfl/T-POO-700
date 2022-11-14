defmodule TimemanagerWeb.UserController do
  use TimemanagerWeb, :controller

  alias Timemanager.Employees
  alias Timemanager.Employees.User
  alias Timemanager.IsAdmin

  action_fallback TimemanagerWeb.FallbackController

  def create(conn, %{"user" => user_params}) do
    with {:ok, %User{} = user} <- Employees.create_user(user_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.user_path(conn, :show, user))
      |> render("show.json", user: user)
    end
  end

  def index(conn, _params) do
    if Timemanager.IsAdmin.is_admin(conn) !== true do
      conn
      |> put_status(:forbidden)
      |> render("error.json", %{error: "You are not authorized to access this resource"})
    else
      users = Employees.list_users()
      render(conn, "index.json", users: users)
    end
  end

  def profile(conn, _params) do
    loggedUser = Guardian.Plug.current_resource(conn)
    render(conn, "show.json", user: loggedUser)
  end

  def show(conn, %{"userID" => userID}) do
    if Timemanager.IsAdmin.is_admin(conn) !== true do
      conn
      |> put_status(:forbidden)
      |> render("error.json", %{error: "You are not authorized to access this resource"})
    else
      user = Employees.get_user!(userID)
      if user === nil do
        conn
        |> put_status(:not_found)
        |> render("error.json", %{error: "User not found"})
      else
        render(conn, "show.json", user: user)
      end
    end
  end

  def update(conn, %{"userID" => userID, "user" => user_params}) do
    {parsedUserID, ""} = Integer.parse(userID)
    if Timemanager.IsAdmin.is_admin(conn) !== true and Guardian.Plug.current_resource(conn).id !== parsedUserID do
      conn
      |> put_status(:forbidden)
      |> render("error.json", %{error: "You are not authorized to access this resource"})
    else
      user = Employees.get_user!(userID)
      if user === nil do
        conn
        |> put_status(:not_found)
        |> render("error.json", %{error: "User not found"})
      else
        with {:ok, %User{} = user} <- Employees.update_user(user, user_params) do
          render(conn, "show.json", user: user)
        end
      end
    end
  end

  def delete(conn, %{"userID" => userID}) do
    if Timemanager.IsAdmin.is_admin(conn) !== true do
      conn
      |> put_status(:forbidden)
      |> render("error.json", %{error: "You are not authorized to access this resource"})
    else
      user = Employees.get_user!(userID)
      if user === nil do
        conn
        |> put_status(:not_found)
        |> render("error.json", %{error: "User not found"})
      else
        with {:ok, %User{}} <- Employees.delete_user(user) do
          send_resp(conn, :no_content, "")
        end
      end
    end
  end
end
