$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "conschedule/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "conschedule"
  s.version     = Conschedule::VERSION
  s.authors     = ["Sakilam Sandeep"]
  s.email       = ["opensource@rubyeffect.com"]
  s.homepage    = "https://github.com/rubyeffect/conschedule"
  s.summary     = "Conschedule library for Rails, from RubyEffect (http://www.rubyeffect.com)"
  s.description = "Conschedule library makes it easy to integrate scheduling in your Rails application, from RubyEffect (http://www.rubyeffect.com)"
  s.license     = "MIT"

  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.md"]

  s.add_dependency "rails", "~> 5.0.0", ">= 5.0.0.1"
  s.add_dependency "gon", "~> 6.1"
  s.add_dependency "kaminari", "~> 0.17.0"

  s.add_development_dependency 'mysql2', '~> 0.4.4'

end