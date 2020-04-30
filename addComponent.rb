require 'json'
FILE_NAME = "./src/components/GetComponents/importer.js"

unless File.exist?(FILE_NAME)
  raise "Invalid file"
end


def remove_line(string, replace_string, other_string_option, delete = false)
  file = File.read(FILE_NAME)
  if delete
    input_lines = File.readlines(FILE_NAME)
    File.open(FILE_NAME, 'w') do |f|
      input_lines.each do |line|
        f.write line unless line.downcase.include? string.downcase
      end
    end
  else
    contained = file.downcase.include? replace_string.downcase
    other_contained = file.downcase.include? other_string_option.downcase
    unless contained || other_contained
      new_content = file.gsub(string, replace_string)
      File.open(FILE_NAME, "w") { |line| line.puts new_content }
    end
  end
end

def get_full_import(name_component = "", new_component = "", inside = false)
  "STARTIMPORT\nimport #{inside ? "{#{name_component}}" : "#{name_component}"} from '#{new_component}';"
end

def add_import(name_component = "", new_component = "", inside = false)
  remove_line("STARTIMPORT", get_full_import(name_component, new_component, inside), get_full_import(name_component, new_component, !inside), false)
  remove_line("STARTCOMPONENTS", "STARTCOMPONENTS\n #{name_component}: #{name_component},", "#{name_component}: #{name_component},", false)
end


# add_import("ClassicEnasaBanner", "@components/Banners/ClassicEaskmnBanner", false)
# remove_line("ClassicEnBanner", "", "", true)
