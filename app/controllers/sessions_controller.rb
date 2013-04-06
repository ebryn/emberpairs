class SessionsController < ApplicationController
  def create
    auth = env['omniauth.auth']
    provider = auth.provider

    case auth.provider
    when 'twitter'
      user = Person.find_or_create_by_twitter(auth.info.nickname)
      user.location = auth.info.location
    when 'github'
      user = Person.find_or_create_by_github(auth.info.nickname)
    end

    user.name = auth.info.name
    user.save

    redirect_to root_path
  end
end
