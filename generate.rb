require 'json'
FILE_NAME = "./json_pages/component.json"
unless File.exist?(FILE_NAME)
  raise "Invalid file"
end
file = File.open("./json_pages/component.json")
file_data = file.read
file_data = JSON.parse(file_data)


# file_data["imports"].each do |import|
#   puts "import #{import["inside"] ? "{#{import["name"]}}" : import["name"]} from '#{import["from"]}'"
# end


def get_nodes(element)
  elements = []
  element.each do |child|
    if child["childs"].kind_of?(Array)
      elements << "<#{child["tag"]} className='#{child["className"]}' >#{get_html(child["childs"])}</#{child["tag"]}>"
    elsif child["childs"].kind_of?(Hash)
      elements << "<#{child["tag"]} className='#{child["className"]}'>#{child["value"]}</#{child["tag"]}>"
    else
      elements << "<#{child["tag"]} className='#{child["className"]}'>#{child["value"]}</#{child["tag"]}>"
    end
  end
  return "<>#{elements.join("")}</>"
end


def get_html(element)
  if element.kind_of?(Array)
    elements = []
    element.each do |child|
      elements << "<#{child["tag"]} className='#{child["className"]}'>#{get_html(child["childs"])}#{child["value"]}</#{child["tag"]}>"
    end
    return elements.join("")
  end
end

puts get_nodes(file_data["main_function"]["body"])


file.close