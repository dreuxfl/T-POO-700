defmodule Timemanager.Guardian.AuthPipeline do
  @moduledoc false

  @claim_access %{typ: "access"}
  @claim_refresh %{typ: "refresh"}

  use Guardian.Plug.Pipeline,
    otp_app: :timemanager,
    module: Timemanager.Guardian,
    error_handler: Timemanager.Guardian.AuthErrorHandler

  plug(Guardian.Plug.VerifyHeader, claims: @claim_access, scheme: "Bearer")
  plug(Guardian.Plug.VerifyCookie, claims: @claim_refresh)
  plug(Guardian.Plug.EnsureAuthenticated)
  plug(Guardian.Plug.LoadResource, ensure: true)
end
