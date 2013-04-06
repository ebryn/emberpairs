class AddGitHubNickname < ActiveRecord::Migration
  def change
    add_column :people, :github, :string
  end
end
