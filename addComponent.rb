require 'json'
FILE_NAME = "./src/components/GetComponents/importer.js"

unless File.exist?(FILE_NAME)
  raise "Invalid file"
end

# file = File.open(FILE_NAME, "r+")

def remove_line(string, new_component = "", name_component = "", inside = false)
  if new_component.empty?
    raise "Invalid name component"
  end
  file = File.read(FILE_NAME)
  contained = file.downcase.include? name_component.downcase && new_component.downcase
  unless contained
    new_content = file.gsub(string, "STARTIMPORT\n import #{inside ? "{#{name_component}}" : "#{name_component}"} from '#{new_component}';")
    # new_content = new_content.map { |word| word == string ? "import ClassicEnBanner from '@components/Banners/ClassicEnBanner';\n// ENDIMPORT" : word }.join("\n")
    File.open(FILE_NAME, "w") { |line| line.puts new_content }
  end
end

remove_line("STARTIMPORT", "@components/Banners/ClassicEnBanner", "ClassicEnBanner", false)
# file.close