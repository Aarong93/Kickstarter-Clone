class User < ActiveRecord::Base
	validates :email, :name, :session_token, presence: true
	validates :email, uniqueness: true
	validates :password, length: { minimum: 6, allow_nil: true}

	has_many :restaurants

	attr_reader :password

	after_initialize :ensure_session_token!

	def self.find_by_credentials(email, password)
		user = User.find_by(email: email)
		return nil unless user && user.valid_password?(password)
		user
	end

	def valid_password?(password)
		BCrypt::Password.new(self.password_digest).is_password?(password)
	end

	def password=(password)
		@password = password
		self.password_digest = BCrypt::Password.create(password)
	end

	def reset_token!
		self.session_token = SecureRandom.urlsafe_base64(16)
		self.save!
		self.session_token
	end

  def self.find_or_create_by_auth_hash(auth_hash)
    provider = auth_hash[:provider]
    uid = auth_hash[:uid]

    author = User.find_by(provider: provider, uid: uid)
    return author if author

    User.create(
      provider: provider,
      uid: uid,
      name: auth_hash[:extra][:raw_info][:name],
      email: auth_hash[:extra][:raw_info][:email]
    )
  end

	private

	def ensure_session_token!
		self.session_token ||= SecureRandom.urlsafe_base64(16)
	end
end
