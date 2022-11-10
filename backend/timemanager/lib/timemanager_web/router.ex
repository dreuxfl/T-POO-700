defmodule TimemanagerWeb.Router do
  use TimemanagerWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, {TimemanagerWeb.LayoutView, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug CORSPlug ,
         origin: ["http://localhost:8080"],
         accepts: ["json"],
         max_age: 86400,
         methods: ["GET", "POST", "PUT", "DELETE"],
         send_preflight_response?: true,
         allow_headers: ["accept", "content-type", "authorization"],
         allow_credentials: true
  end

  pipeline :auth do
    plug Timemanager.Guardian.AuthPipeline
  end

  scope "/", TimemanagerWeb do
    pipe_through :browser

    get "/", PageController, :index
  end

  # Other scopes may use custom stacks.
  scope "/api", TimemanagerWeb do
    pipe_through :api

    post "/login", SessionController, :login
    post "/users", UserController, :create
  end

  scope "/api", TimemanagerWeb do
     pipe_through [:api, :auth]

     post "/login/refresh", SessionController, :refresh
     post "/login/delete", SessionController, :delete

     get "/profile", UserController, :profile
     get "/users", UserController, :index
     get "/users/:userID", UserController, :show
     put "/users/:userID", UserController, :update
     delete "/users/:userID", UserController, :delete

     post "/workingtimes/:userID", WorkingtimeController, :create
     get "/workingtimes/", WorkingtimeController, :index
     get "/workingtimes/:userID", WorkingtimeController, :all
     get "/workingtimes/:userID/:id", WorkingtimeController, :show
     put "/workingtimes/:id", WorkingtimeController, :update
     delete "/workingtimes/:id", WorkingtimeController, :delete

     get "/clocks/:userID", ClockController, :index
     get "/clocks/:userID/today", ClockController, :fetchCurrentClocks
     post "/clocks/:userID", ClockController, :create

     get "/chartmanager/linechart/:userID", ChartmanagerController, :linechart_workingtime_clockedhours
     get "/chartmanager/piechart/:userID", ChartmanagerController, :piechart_workingtime_clockedhours_user
     get "/chartmanager/barchart", ChartmanagerController, :barchart_stats
  end

  # Enables LiveDashboard only for development
  #
  # If you want to use the LiveDashboard in production, you should put
  # it behind authentication and allow only admins to access it.
  # If your application does not have an admins-only section yet,
  # you can use Plug.BasicAuth to set up some basic authentication
  # as long as you are also using SSL (which you should anyway).
  if Mix.env() in [:dev, :test] do
    import Phoenix.LiveDashboard.Router

    scope "/" do
      pipe_through :browser

      live_dashboard "/dashboard", metrics: TimemanagerWeb.Telemetry
    end
  end

  # Enables the Swoosh mailbox preview in development.
  #
  # Note that preview only shows emails that were sent by the same
  # node running the Phoenix server.
  if Mix.env() == :dev do
    scope "/dev" do
      pipe_through :browser

      forward "/mailbox", Plug.Swoosh.MailboxPreview
    end
  end
end
