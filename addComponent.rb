require 'json'
FILE_NAME = "./src/components/GetComponents/index.jsx"

unless File.exist?(FILE_NAME)
  raise "Invalid file"
end

file = File.open FILE_NAME
file_data = file.read

rx = Regexp.new(Regexp.escape("renderComponent"), true)
matches_array = []
i = 1
IO.foreach(FILE_NAME) do |line|
  puts "#{line} #{i}"
  matches_array.push(i) if line[rx]
  i += 1
end
puts matches_array.inspect
