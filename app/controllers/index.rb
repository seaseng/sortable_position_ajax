get '/' do
  @items = Item.order(:position)
  erb :index
end

post '/' do 
  @item = Item.new(name: params[:item][:name], position: Item.count + 1)  
  if @item.save
    @item.to_json
  else
    { :message => 'Ups, something went wrong.', :status => 401 }.to_json
  end
end

put '/update_all' do
  ap params

  # @items = Item.order(:position)
  params[:id].each_with_index do |id, index|
    item = Item.find(id)
    item.position = index+1
    item.save
  end

  @items = Item.order(:position)
  @items.to_json
end