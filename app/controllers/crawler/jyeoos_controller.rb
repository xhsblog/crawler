require 'open-uri'

class Crawler::JyeoosController < Crawler::BaseController
  def index
    url = 'http://www.jyeoo.com/math2/ques/partialques?f=1&q=A~~&lbs=&so=1&pd=1&pi=2&r=0.7528943867196467'
    uri = URI.parse('http://www.jyeoo.com/math2/ques/partialques')
    param = {
      f: 1,
      q: 'A~~',
      lbs: '',
      so: 1,
      pd: 1,
      pi: 2,
      r: 0.7528943867196467
    }
    uri.query = URI.encode_www_form(param)
    res = Net::HTTP.get_response(uri)
    cookies = res.get_fields('set-cookie')
    puts "cookies ius #{cookies}"
    res.response['set-cookie']#.split(';')
    if !res.is_a?(Net::HTTPSuccess)
      render text: "获取内容失败 => #{uri}" 
    end

    puts "res response cookie #{res.response['set-cookie'].split(';')} "

    html = Nokogiri::HTML(open(url))
    questions = html.search('fieldset.quesborder')
    # binding.pry
    questions.each_with_index do |question|
      id = question.to_h['id']
      # puts "question shi #{question['id']}, id 是 #{id}"
    end
    puts "question shi #{questions.last.to_json}, id 是 #{'id'}"
    # puts "Nokogiri::HTML(open(url)), #{Nokogiri::HTML(open(url))}"
    # r = Net::HTTP.get(URI.parse('http://www.example.com/about.html'))
    # puts "r is #{html.search('ul.ques-list')}"
    # website = RemoteUrls.brand_uri
    # CrawlerRunner.new(self.new(website), ::MechanizeAgent.new ).crawl if website.present?
    # Crawlers::Jyeoo::QuestionCrawler.crawl(website)
    # render html: res.body

    render html: res.body.html_safe
    # respond_to do |format|
    #   format.html { render :text => res.body }
    # end
  end
end
