module Conschedule
  module Generators

    module ViewPathTemplates #:nodoc:
      extend ActiveSupport::Concern
      
      included do
        class_option :views, aliases: "-v", type: :array, desc: "Select specific views to generate (form, listing page, mailer)"
      end 

      protected
        def view_directory(name)
          if name.to_s == "form"
            directory "conschedule/schedules", "app/views/conschedule/schedules", exclude_pattern: /index|_schedules/  
          elsif name.to_s == "listing"
            ["index.html.erb","index.js.erb","_schedules.html.erb"].each do |file|
              copy_file "conschedule/schedules/#{file}", "app/views/conschedule/schedules/#{file}"
            end 
            directory "kaminari", "app/views/kaminari"
          elsif name.to_s == "mailer"
            directory "conschedule/schedules_mailer", "app/views/conschedule/schedules_mailer"
          end  
        end
    end

    class ViewsGenerator < Rails::Generators::Base #:nodoc:
      include ViewPathTemplates

      source_root File.expand_path("../../../../app/views", __FILE__)

      desc "Copies Conschedule views to your application."
      def copy_views
        if options[:views]
          options[:views].each do |directory|
            view_directory directory.to_sym
          end
        else
          view_directory :form
          view_directory :listing
          view_directory :mailer
        end  
      end
    end
  end
end