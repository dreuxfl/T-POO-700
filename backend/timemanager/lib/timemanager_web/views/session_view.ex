defmodule TimemanagerWeb.SessionView do
  use TimemanagerWeb, :view

  def render("token.json", %{access_token: acces_token}) do
    %{access_token: acces_token}
  end
end
