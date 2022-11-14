defmodule Timemanager.IsAdmin do
  @moduledoc false

  import Plug.Conn
  import Phoenix.Controller

  def is_admin(conn) do
    logged_user = Guardian.Plug.current_resource(conn)
    if logged_user.is_admin != true do
      false
    else
      true
    end
  end
end
