class CreateConscheduleSchedules < ActiveRecord::Migration[5.0]
  def change
    create_table :conschedule_schedules do |t|
      t.string   :app_time_zone
      t.string   :user_time_zone
      t.string   :app_tz_offset
      t.string   :user_tz_offset
      t.string   :event_name
      t.string   :event_description
      t.string   :location_details
      t.datetime :slot_start_time
      t.datetime :slot_end_time
      t.string   :contact_name
      t.string   :first_name
      t.string   :last_name
      t.string   :phone
      t.string   :email
      t.text     :message
      t.string   :status, default: :active
      t.string   :cancel_reason
      t.timestamps
    end

    add_index :conschedule_schedules, :slot_start_time
    add_index :conschedule_schedules, :status
  end
end
