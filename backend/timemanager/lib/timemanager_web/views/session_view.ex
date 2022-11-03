defmodule TimemanagerWeb.SessionView do
  use TiemanagerWeb, :view

  def render("token.json", %{access_token: acces_token}) do
    %{access_token: acces_token}
  end
end
