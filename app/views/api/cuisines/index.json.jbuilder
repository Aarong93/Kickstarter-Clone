json.array! @cuisines do |cuisine|
	json.extract! cuisine, :food, :id
end
