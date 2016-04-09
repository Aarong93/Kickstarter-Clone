class Restaurant < ActiveRecord::Base
	belongs_to :user
	belongs_to :cuisine
	belongs_to :city
	has_many :contributions
	has_many :rewards

  include PgSearch

  pg_search_scope :restaurant_search,
    against: {
      title: 'A',
      blurb: 'B',
      description: 'C'
    },
    associated_against: {
      user: { name: 'B' },
      cuisine: { food: 'B'},
      rewards: { name: 'D' }
    }

	has_attached_file :image, default_url: :set_default_url_on_cuisine,
		:styles => {small: "250x150#", large: "1800x1200#"},
		:convert_options => { :small => "-quality 75 -strip" }
	validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

	validates :user_id, :cuisine_id, :title, :city_id, presence: true
	validates :title, uniqueness: { case_sensitive: false }

	def self.with_total()
		restaurants = Restaurant.joins("LEFT OUTER JOIN contributions ON contributions.restaurant_id = restaurants.id").
		group(:id).select("restaurants.*, SUM(contributions.value) as total, COUNT(contributions.user_id) as number_contributions")

		restaurants
	end

  private

  def set_default_url_on_cuisine
    cuisine.food + "_:style.jpg"
  end

end
