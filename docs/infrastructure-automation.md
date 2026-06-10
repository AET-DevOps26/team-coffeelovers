# Infrastructure Automation

This repository now includes Terraform for working against an existing Azure environment and Ansible for VM configuration and application deployment.

Update the resource names and VM public IP in `infra/terraform/terraform.tfvars` and `infra/ansible/inventory.ini` to match your target Azure environment.
## What Terraform Reads

Terraform reads the existing Azure resources needed for deployment:

- Resource group `devops`
- Virtual network `devops-vnet`
- Subnet `default`
- Network interface `devops225_z1`
- Linux virtual machine `devops`

The public IP for the VM is treated as an existing target address: `172.160.248.100`.

## What Ansible Does

Ansible prepares the VM and deploys the application:

- Installs Docker and the Docker Compose plugin
- Installs Git and supporting packages
- Starts the Docker service
- Clones the repository onto the VM
- Writes the runtime `.env` file on the VM
- Runs `docker compose up -d --build`

The current application already uses Docker Compose, so the VM deployment is container-based rather than installing Java, Node.js, or PostgreSQL directly on the host.

## Secret Handling

- Do not commit `infra/terraform/terraform.tfvars`
- Do not commit `infra/ansible/inventory.ini`
- Do not commit `infra/ansible/group_vars/all.yml`
- Use Ansible Vault if you want to store sensitive values in encrypted form

## Repeating From a Clean Environment

To repeat the deployment on the same host, rerun `ansible-playbook` after any VM reset or application update.

If the Azure resources are recreated later, update the names and IPs in the Terraform variables and inventory first.

## Notes

- The current Ansible playbook assumes the repository is reachable from the VM.
- If you later move secrets into Azure Key Vault, the playbook can be extended to fetch them at deploy time.