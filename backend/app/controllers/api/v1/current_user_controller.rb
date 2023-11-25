class Api::V1::CurrentUserController < ApplicationController
  def show
    render json: current_api_v1_user
  end
end
