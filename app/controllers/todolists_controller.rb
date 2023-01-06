class TodolistsController < ApplicationController
  def index
    todolists = Todolist.order('created_at DESC')
    render json: {status: 'SUCCESS', message: 'Loaded todolists', data: todolists}, status: :ok
  end

  def create
    todolist = Todolist.create(todolist_params)
    render json: {status: 'SUCCESS', message: 'Saved todolist', data: todolist}, status: :ok
  end

  def update
    todolist = Todolist.find(params[:id])
    todolist.update_attributes(todolist_params)
    render json: {status: 'SUCCESS', message: 'Updated todolist', data: todolist}, status: :ok
  end

  def destroy
    todolist = Todolist.find(params[:id])
    todolist.destroy
    render json: {status: 'SUCCESS', message: 'Deleted todolist', data: todolist}, status: :ok
  end
end
