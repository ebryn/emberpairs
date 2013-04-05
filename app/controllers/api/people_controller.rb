class Api::PeopleController < ApplicationController
  def index
    render json: Person.all
  end

  def create
    person = Person.create params[:person]
    render json: person
  end
end
