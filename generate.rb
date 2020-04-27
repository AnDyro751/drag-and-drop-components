require 'json'
FILE_NAME = "./json_pages/component.json"
unless File.exist?(FILE_NAME)
  raise "Invalid file"
end
file = File.open("./json_pages/component.json")
file_data = file.read
file_data = JSON.parse(file_data)


file_data["imports"].each do |import|
  puts "import #{import["inside"] ? "{#{import["name"]}}" : import["name"]} from '@components/#{import["from"]}'"
end


def get_nodes(element)
  elements = []
  element.each do |child|
    if child["childs"].kind_of?(Array)
      elements << <<-HTML
        <#{child["tag"]} className='#{child["className"]}' >
          #{get_html(child["childs"])}
        </#{child["tag"]}>
      HTML
    elsif child["childs"].kind_of?(Hash)
      elements << <<-HTML
        <#{child["tag"]} className='#{child["className"]}'>
          #{child["value"]}
        </#{child["tag"]}>
      HTML
    else
      elements << <<-HTML.chomp
        <#{child["tag"]} className='#{child["className"]}'>
          #{child["value"]}  
        </#{child["tag"]}>
      HTML
    end
  end
  return "<>\n#{elements.join("")}\n</>"
end


def get_html(element)
  if element.kind_of?(Array)
    elements = []
    element.each do |child|
      element_string = <<-HTML.chomp
        <#{child["tag"]} className='#{child["className"]}'>
          #{get_html(child["childs"])}#{child["value"]}
        </#{child["tag"]}>
      HTML
      elements << element_string
    end
    return elements.join("\n")
  end
end


# puts get_nodes(file_data["main_function"]["body"])

def get_main_function(data, raw)
  get_main_component data["name"], data["main_function"]["props"] || [], raw
end

def get_main_component(name, props, body_raw)
  raise "Invalid name" if name.nil?
  puts <<-HTML.chomp
    const #{name} = ({#{get_props(props)}}) =>{
      return(#{get_nodes(body_raw)})
    }
    export default #{name}
  HTML
end


def get_props(props)
  string_parsed = ""
  props.each do |prop|
    string_parsed = string_parsed + "#{prop[0]} = #{prop[1]},"
  end
  string_parsed.slice(0, string_parsed.length - 1)
end


get_main_function(file_data, file_data["main_function"]["body"])


file.close