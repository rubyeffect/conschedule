# Conschedule

Conschedule library for Rails

## Installation

Add this line to your application's Gemfile:

```ruby
gem 'conschedule'
```

And then execute:

    $ bundle

Or install it yourself as:

    $ gem install conschedule

## Embedding in a Rails app

Add the following to your routes.rb file:

``` ruby
mount Conschedule::Engine, at: "/"
```

(NOTE: You may mount the server at any path, not just "/")

You can then browse to your application path to view listing page, conschedule form page i.e.

* For listing page: http://127.0.0.1:3000
* For contact form page: http://127.0.0.1:3000/schedules/new

If you wish to authenticate listing page with Devise, it would look something like:

``` ruby
authenticate :admin do
  get "/admin/schedules" => "conschedule/schedules#index"
end
```    

## Configuration 

Conschedule is extremely simple to setup. Just configure basic settings for Conschedule:

```ruby
Conschedule.configuration do |config|
  config.main_heading = "Contact"
  config.purpose = 'An introduction to our product'
  config.instructions = 'Learn about our product'
  config.location_details = 'Details will be provided on confirmation'
  config.system_time_zone = "UTC"
  config.start_date = "2016-01-01"
  config.end_date = "2016-12-31"
  config.available_days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] 
  config.black_out_dates
  config.sun_timings = ["09:00", "17:00"]
  config.mon_timings = ["09:00", "17:00"]
  config.tue_timings = ["09:00", "17:00"]
  config.wed_timings = ["09:00", "17:00"]
  config.thu_timings = ["09:00", "17:00"]
  config.fri_timings = ["09:00", "17:00"]
  config.sat_timings = ["09:00", "17:00"]
  config.duration = 30
  config.from_address = "PLEASE-CHANGE-ME@example.com"
  config.send_confirmation_mail = false
  config.send_cancel_mail = false
  config.to_address = "PLEASE-CHANGE-ME@example.com"
  config.contact_name = "PLEASE-CHANGE-ME"
  config.enable_tz = true
end
```

The key options available are:

| Option                    | Description                                                          |
| -----------------         | -------------------------------                                      |
| `main_heading`            | String to add page heading/title.                                    |
| `instructions`            | String to convey a message to user.                                  |
| `location_details`        | String to provide location details to user.                          |
| `system_time_zone`        | TimeZone defines time zone of the application.                       |
| `start_date`              | Date defines the start date of the calendar.                         |
| `end_date`                | Date defines the end date of the calendar.                           |
| `available_days`          | Array of abbreviated weekday name.                                   |
| `black_out_dates`         | Array of dates to mark unavailable dates in calendar.                |
| `sun_timings`             | Array of times defines start and end time of weekday Sunday.         |
| `mon_timings`             | Array of times defines start and end time of weekday Monday.         |
| `tue_timings`             | Array of times defines start and end time of weekday Tuesday.        |
| `wed_timings`             | Array of times defines start and end time of weekday Wednesday.      |
| `thu_timings`             | Array of times defines start and end time of weekday Thursday.       |
| `fri_timings`             | Array of times defines start and end time of weekday Friday.         |
| `sat_timings`             | Array of times defines start and end time of weekday Saturday.       |
| `duration`                | Integer defines duration of the slot in minutes.                     |
| `from_address`            | String for sending confirmation and cancel mails.                    |
| `send_confirmation_mail`  | Boolean defines wheather a copy of confirmation mail to be sent to the 'to_address'.     |
| `send_cancel_mail`        | Boolean defines wheather a copy of cancel mail to be sent to the 'to_address'.     |
| `to_address`              | String for receving confirmation and cancel mails.                |
| `contact_name`            | String used in confirmation and cancel mails.                     |
| `enable_tz`               | Boolean defines wheather the time zone drop down should be active/inactive.     |

Ensure you have set 'from_address' and 'contact_name' in config/initializers/conschedule.rb
  
```ruby
config.from_address = "foo@example.com"
config.contact_name = "foo"
```

If you wish to receive confirmation and cancel mails, ensure you have set following config variables in config/initializers/conschedule.rb:

```ruby
config.send_confirmation_mail = true
config.send_cancel_mail = true
config.to_address = "foo@example.com"
```

## Customization

We built Conschedule to help you quickly integrate contact form in your application. However, we don't want to be in your way when you need to customize it.

Since Conschedule is an engine, all its views are packaged inside the gem. These views will help you get started, but after some time you may want to change them. If this is the case, you just need to invoke the following generator, and it will copy all views to your application:

```console
$ rails generate conschedule:views
```

If you would like to generate only a few sets of views, like the ones for the `form` and `listing`,
you can pass a list of names to the generator with the `-v` flag.

```console
$ rails generate conschedule:views -v form listing
```

## Contributing

1. Fork it ( https://github.com/rubyeffect/conschedule/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

## Links

 * Code: `git clone git://github.com/rubyeffect/conschedule.git`
 * Home: <http://github.com/rubyeffect/conschedule>

## About RubyEffect

![RubyEffect](http://blog.rubyeffect.com/wp-content/uploads/2015/05/cropped-re_original_logo.png)

RubyEffect builds intuitive, live and elegant software that solves real world problems. We love open source and it's community.

We would love to work on your ideas and see them grow. Say hello @ http://rubyeffect.com/contact