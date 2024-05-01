FROM node:21-slim

ENV ZSH_CUSTOM /root/.oh-my-zsh/custom

RUN apt-get update -y

### zsh ###
RUN apt-get install -y zsh git curl openssl
RUN zsh && \
    sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)" && \
    git clone https://github.com/romkatv/powerlevel10k.git $ZSH_CUSTOM/themes/powerlevel10k && \
    git clone https://github.com/zsh-users/zsh-syntax-highlighting ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting && \
    git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/plugins/zsh-autosuggestions && \
    sed -i 's|\(plugins=(\).*|\1git zsh-autosuggestions zsh-syntax-highlighting web-search)|' $HOME/.zshrc

RUN PATH="$PATH:/usr/bin/zsh"

WORKDIR /nuxt
CMD yarn install && yarn nuxi dev


