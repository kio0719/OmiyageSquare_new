class Api::V1::Auth::SessionsController < DeviseTokenAuth::SessionsController
  def resource_params
    params.require(:session).permit(:email, :password)
  end
end
