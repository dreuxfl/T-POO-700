defmodule Timemanager.Guardian do
  @moduledoc false

  use Guardian, otp_app: :timemanager
  alias Timemanager.Employees

  def subject_for_token(resource, _claims) do
    sub = to_string(resource.id)
    {:ok, sub}
  end

  def resource_from_claims(claims) do
    id = claims["sub"]
    resource = Employees.get_by_id!(id)
    {:ok,  resource}
  end
end
