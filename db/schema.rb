# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160329195648) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "cities", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "cuisines", force: :cascade do |t|
    t.string   "food"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "restaurants", force: :cascade do |t|
    t.integer  "user_id",     null: false
    t.integer  "cuisine_id",  null: false
    t.string   "title",       null: false
    t.integer  "city_id"
    t.text     "blurb"
    t.string   "description"
    t.integer  "target"
    t.integer  "current"
    t.date     "expiration"
    t.boolean  "published",   null: false
    t.boolean  "featured"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "restaurants", ["city_id"], name: "index_restaurants_on_city_id", using: :btree
  add_index "restaurants", ["cuisine_id"], name: "index_restaurants_on_cuisine_id", using: :btree
  add_index "restaurants", ["published"], name: "index_restaurants_on_published", using: :btree
  add_index "restaurants", ["title"], name: "index_restaurants_on_title", unique: true, using: :btree
  add_index "restaurants", ["user_id"], name: "index_restaurants_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",           null: false
    t.string   "name",            null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
