defmodule Timemanager.Guardian.AuthPipeline do
  @claim %{typ: "access"}

  use Guardian.Plug.Pipeline,
    otp_app: :timemanager,
    module: Timemanager.Guardian,
    error_handler: Timemanager.Guardian.AuthErrorHandler

  plug(Guardian.Plug.VerifyHeader, claims: @claims, realm: "Bearer")
  plug(Guardian.Plug.EnsureAuthenticated)
  plug(Guardian.Plug.LoadResource, ensure: true)
end
