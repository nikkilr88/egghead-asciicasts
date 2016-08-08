    require 'json'
    
    puts 'Enter directory you want to extract asciicasts from:'
    director_to_extract_from = gets.chomp
    
    obj_to_send = {}
    File.open("#{director_to_extract_from}/SUMMARY.md", 'r') do |file|
        file.readlines.each do |line|
            if line[/\(.*?\)/]
                # cant figure out how to grab content within parens with regex
                asciicast_file_name = line[/\(.*?\)/]
                asciicast_file_name[0] = ""
                asciicast_file_name[-1] = ""
                from_file = File.open("#{director_to_extract_from}/#{asciicast_file_name}", "rb")
                asciicast_from_file = from_file.read
                new_ascii_hash = {"#{asciicast_file_name}" => "#{asciicast_from_file}"}
                obj_to_send.merge!(new_ascii_hash)
                from_file.close
            end
        end
        file.close
    end 
    
File.open("asciicast.json", 'w') do |file|
    file.puts(obj_to_send.to_json)
    file.close
end