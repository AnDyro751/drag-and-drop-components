require 'json'
FILE_NAME = "./json_pages/component.json"
unless File.exist?(FILE_NAME)
  raise "Invalid file"
end
file = File.open("./json_pages/component.json")
file_data = file.read
file_data = JSON.parse(file_data)


# file_data["imports"].each do |import|
#   puts "import #{import["inside"] ? "{#{import["name"]}}" : import["name"]} from '@components/#{import["from"]}'"
# end


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
  "<>\n#{elements.join("")}\n</>"
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
    elements.join("\n")
  end
end


def get_main_function(data, raw)
  get_main_component data["name"], data["main_function"]["props"] || [], raw
end

def get_main_component(name, props, body_raw)
  raise "Invalid name" if name.nil?
  return <<-HTML.chomp
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


# get_main_function(file_data, file_data["main_function"]["body"])


def get_styles(styles)
  all_class = ""
  global_class = ""
  styles.map { |style|
    className = ".#{style["className"]} {"
    style["content"].each { |name, value|
      className += "\n\t#{name}: #{value};"
    }
    className += "\n}\n"
    all_class += className unless style["global"]
    global_class += className if style["global"]
  }
  parse_styles(all_class, global_class)
end


def parse_styles(string_styles, global_class)
  full_styles = ""
  all_style = "\n<style jsx>{`\n"
  all_style += "#{string_styles}"
  all_style += "\n`}</style>\n"
  all_global = ""
  unless global_class.empty?
    all_global += "\n<style jsx global>{`\n"
    all_global += "#{global_class}"
    all_global += "\n`}</style>\n"
  end
  full_styles = all_global + all_style
  puts full_styles
  full_styles
end

get_styles(file_data["main_function"]["styles"])


file.close