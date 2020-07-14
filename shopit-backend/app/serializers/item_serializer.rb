class ItemSerializer < ActiveModel::Serializer

  attributes :id, :name, :description, :bought, :quantity, :list_id
  belongs_to :list
  
end
