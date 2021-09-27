<template>
  <div class="home">
      <v-app>
          <v-app-bar id="cabecalho" fixed app>
            <v-spacer />
            <v-toolbar-title class="text-h4"><strong>Seja Bem Vindo</strong></v-toolbar-title>
            <v-spacer />
            <v-toolbar-title class="text-h4"><strong>{{ timestamp }}</strong></v-toolbar-title>
          </v-app-bar>
          <v-main id="corpo">
            <v-container class="fill-height" fluid>
                <v-row class="fill-height">
                    <v-col cols="12" md="8">
                        <v-card id="fundoCard" height="100%" elevation="1">
                            <v-card-title class="pa-16" />
                            <v-card-text class="justify-center black--text">
                              <v-row class="mx-10 justify-center">
                                <div class="mt-16 mb-8 text-center text-h1"><strong>{{ dados[0].paciente }}</strong></div>
                              </v-row>
                              <div id="fontMedico" class="mt-16 mb-8 text-center text-h2 font-weight-light"><strong>{{ dados[0].medico }}</strong></div>
                            </v-card-text>
                            <v-card-actions class="justify-center">
                              <div class="mt-16 text-center text-h1"><strong>{{ dados[0].guiche }}</strong></div>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-card id="fundoCard" height="24.25%" elevation="1">
                            <v-card-title class="pa-6" />
                            <v-card-text class="justify-center black--text">
                                <v-row class="justify-center mx-10">
                                    <div class="text-center text-h4">
                                      <strong>{{ dados[1].paciente }}</strong>
                                    </div>
                              </v-row>
                            </v-card-text>
                            <v-card-actions class="justify-center">
                              <div class="text-center text-h4"><strong>{{ dados[1].guiche }}</strong></div>
                            </v-card-actions>
                        </v-card>
                        <v-card id="fundoCard" class="mt-2" height="24.25%" elevation="1">
                            <v-card-title class="pa-6" />
                            <v-card-text class="justify-center black--text">
                                <v-row class="justify-center mx-10">
                                    <div class="text-center text-h4">
                                      <strong>{{ dados[2].paciente }}</strong>
                                    </div>
                                </v-row>
                            </v-card-text>
                            <v-card-actions class="justify-center">
                              <div class="text-center text-h4"><strong>{{ dados[2].guiche }}</strong></div>
                            </v-card-actions>
                        </v-card>
                        <v-card id="fundoCard" class="mt-2" height="24.25%" elevation="1">
                            <v-card-title class="pa-6" />
                            <v-card-text class="justify-center black--text">
                                <v-row class="justify-center mx-10">
                                    <div class="text-center text-h4">
                                      <strong>{{ dados[3].paciente }}</strong>
                                    </div>
                                </v-row>
                            </v-card-text>
                            <v-card-actions class="justify-center">
                              <div class="text-center text-h4"><strong>{{ dados[3].guiche }}</strong></div>
                            </v-card-actions>
                        </v-card>
                        <v-card id="fundoCard" class="mt-2" height="24.25%" elevation="1">
                            <v-card-title class="pa-6" />
                            <v-card-text class="justify-center black--text">
                                <v-row class="justify-center mx-10">
                                    <div class="text-center text-h4">
                                      <strong>{{ dados[4].paciente }}</strong>
                                    </div>
                                </v-row>
                            </v-card-text>
                            <v-card-actions class="justify-center">
                              <div class="text-center text-h4"><strong>{{ dados[4].guiche }}</strong></div>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
              </v-container>
          </v-main>
          <v-footer id="rodape" class="justify-center text-h4" fixed app>
            <strong>Telefone (62) 1234-1234 / Whatsapp (62) 12345-1234</strong>
          </v-footer>
      </v-app>
  </div>
</template>

<script>
import SocketIO from 'socket.io-client'

export default {
    name: 'Home',
    data() {
        return {
            timestamp: '',
            isConnected: false,
            senhasAnteriores: [],
            dados: []
        }
    },
    created() {
        const serverId = this.$route.params.server
        const socketHost = `http://localhost:3030/server`
        console.log(`Conexao para ${socketHost}`)

        const socket = SocketIO(socketHost)

        socket.on('connect', () => {
            this.isConnected = true
            socket.emit('join', serverId)
        })
        socket.on('messageChannel', (dados) => {
            this.dados = dados
        })
    },
    mounted() {
        setInterval(() => {
            this.getNow()
        }, 1000);
    },
    methods: {
        getNow() {
            const zeroFill = n => {
                return ('0' + n).slice(-2);
            }
            const today = new Date();
            const time = zeroFill(today.getHours()) + ":" + zeroFill(today.getMinutes());
            return this.timestamp = time;
        }
    }
}
</script>

<style scoped>
 #cabecalho {
    background: linear-gradient(to left, #81D4FA, #039BE5) !important;
}

 #rodape {
    background: linear-gradient(to left, #81D4FA, #039BE5) !important;
}

 #fundoCard {
    background: linear-gradient(to right, #81D4FA, #4FC3F7) !important;
}

 #fontMedico {
    font-size: 4.5rem !important;
}

 #corpo {
    background: linear-gradient(to right, #BBDEFB, #B3E5FC, #B2EBF2) !important;
}
</style>
