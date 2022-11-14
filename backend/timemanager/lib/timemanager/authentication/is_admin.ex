defmodule Timemanager.IsAdmin do
  import Plug.Conn
  import Phoenix.Controller

  def is_admin(conn) do
    loggedUser = Guardian.Plug.current_resource(conn)
    if loggedUser.is_admin != true do
      false
    else
      true
    end
  end
end
