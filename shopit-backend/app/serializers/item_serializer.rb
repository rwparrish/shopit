class ItemSerializer < ActiveModel::Serializer

  attributes :id, :name, :description, :bought, :quantity
  belongs_to :list
  
end
