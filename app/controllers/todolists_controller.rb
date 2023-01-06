class TodolistsController < ApplicationController
  def index
    todolists = Todolist.order('created_at DESC')
    render json: todolists
  end

  def create
    todolist = Todolist.create(todolist_params)
    render json: todolist

  def update
    todolist = Todolist.find(params[:id])
    todolist.update_attributes(todolist_params)
    render json: todolist
  end

  def destroy
    todolist = Todolist.find(params[:id])
    todolist.destroy
    head :no_content, status: :ok
  end

  private

  def todolist_params
    params.require(:todolist).permit(:title, :done)
  end
  end
end
