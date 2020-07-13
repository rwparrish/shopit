class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :bought, :quantity, :list_id
end
